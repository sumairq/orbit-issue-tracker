import React from 'react';

import { TableScroll, Table, Th, Td, Tr, SkeletonBar } from './Styles';

const ROWS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8'];

// Skeleton rows in the real table shell so the layout doesn't jump when data
// arrives (and the screen is never blank).
const ProjectListSkeleton = () => (
  <TableScroll>
    <Table>
      <thead>
        <tr>
          <Th $sticky>Title</Th>
          <Th>Status</Th>
          <Th>Assignee</Th>
          <Th>Priority</Th>
          <Th>Updated</Th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map(key => (
          <Tr key={key}>
            <Td $sticky>
              <SkeletonBar width="70%" />
            </Td>
            <Td>
              <SkeletonBar width="80px" height={20} />
            </Td>
            <Td>
              <SkeletonBar width="24px" height={24} />
            </Td>
            <Td>
              <SkeletonBar width="60px" />
            </Td>
            <Td>
              <SkeletonBar width="70px" />
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  </TableScroll>
);

export default ProjectListSkeleton;
